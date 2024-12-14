from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet,ViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import JobModel,WorkerModel,Notification,Feedback
from django.contrib.auth.models import User
from rest_framework import authentication,permissions
from .serializers import JobSerializer,UserRegisterSerializer,WorkerSerializer,FeedbackSerializer
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.hashers import check_password
from django.contrib.auth.tokens import default_token_generator
from rest_framework.decorators import api_view
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

# Create your views here.
class UserRegisterView(ViewSet):
    def create(self,request,*args,**kwargs):
        serializer=UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)

class JobPosting(ModelViewSet):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    queryset=JobModel.objects.all()
    serializer_class=JobSerializer

    def get_queryset(self):
        return JobModel.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer=JobSerializer(data=request.data,context={"user":request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(serializer.errors)
        
class UserLogoutView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Logged out successfully"})

        
class WorkerRegistrationView(APIView):
    def get(self,request):
        workers=WorkerModel.objects.all()
        serializer = WorkerSerializer(workers, many=True)
        return Response(serializer.data)
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        phone = request.data.get('phone')
        location = request.data.get('location')
        pin = request.data.get('pin')
        skills = request.data.get('skills')
        certification = request.FILES.get('certification')
        profile_picture = request.FILES.get('profile_picture')
    
        # Ensure username, email, and password are provided
        if not username or not email or not password:
            return Response(
                {"error": "Username, email, and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        user_data = {
            "username": username,
            "email": email,
            "password": password,
        }
        user = User.objects.create_user(**user_data)
        # Now, process the Worker data
        worker = WorkerModel.objects.create(user=user,phone=phone,location=location,pin=pin,skills=skills,certification=certification,profile_picture=profile_picture)
        return Response({'message': 'Worker registered successfully!'}, status=201)
    
class NewWorkerNotificationView(APIView):
    def get(self, request):
        unapproved_workers = WorkerModel.objects.filter(is_approved=False)
        count = unapproved_workers.count()
        return Response({"unread_count": count})


        
class AdminApprovalView(APIView):
    def post(self, request, worker_id):
        worker = WorkerModel.objects.get(id=worker_id)
        worker.is_approved = True
        worker.save()
        send_mail(
                'Approval Notification',
                f'Dear {worker.user.username},\n\nYour account has been approved. Now You can now log in using your credentials.',
                settings.DEFAULT_FROM_EMAIL,
                [worker.user.email]
            )
        return Response({"message": "Worker approved successfully"})
    
class WorkerLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Both username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=username)  # Fetch the User instance
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Validate the password
        if not check_password(password, user.password):
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            worker = WorkerModel.objects.get(user=user)  # Fetch the WorkerModel instance
        except WorkerModel.DoesNotExist:
            return Response({"error": "Worker account not found"}, status=status.HTTP_404_NOT_FOUND)

        if not worker.is_approved:
            return Response({"error": "Your account is not approved by admin Yet. please Try after sometimes", "is_approved": False}, status=status.HTTP_403_FORBIDDEN)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({"message": "Login successful","is_approved": worker.is_approved,"token": token.key}, status=status.HTTP_200_OK)


        
class WorkerView(ModelViewSet):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    queryset=WorkerModel.objects.all()
    serializer_class=WorkerSerializer

class JobMatchingView(ModelViewSet):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=JobSerializer

    def get_queryset(self):
        user = self.request.user
        worker = WorkerModel.objects.get(user=user)
        return JobModel.objects.filter(skill=worker.skills, status='pending')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        data = [
            {
                "id": job.id,
                "title": job.title,
                "description": job.description,
                "location": job.location,
                "pin": job.pin,
                "date_posted": job.date_posted,
                "date_required": job.date_required,
                "skill": job.skill,
                "status": job.status,
            }
            for job in queryset
        ]
        self.notify_workers(queryset)

        return Response(data, status=200)
    
    def notify_workers(self, jobs):
        for job in jobs:
            workers = WorkerModel.objects.filter(skills__contains=job.skill)
            for worker in workers:
                # Prepare plain-text email content
                subject = f"New Job Available: {job.title}"
                message = (
                    f"Hi {worker.user.first_name},\n\n"
                    f"A new job has been posted that matches your skills:\n"
                    f"Job Title: {job.title}\n"
                    f"Description: {job.description}\n"
                    f"Location: {job.location}\n"
                    f"Date Required: {job.date_required}\n\n"
                    f"Please log in to your account to view more details and accept the job.\n\n"
                    f"Thank you,\n"
                    f"servicePeediya"
                )
                # Send the email
                send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [worker.user.email])

class ApplyJob(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Retrieve job ID from request data or URL kwargs
        job_id = request.data.get('id')
        if not job_id:
            return Response({"error": "Job ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Fetch the job by ID
            job = JobModel.objects.get(id=job_id)
        except JobModel.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)

        # Ensure the requesting user is a worker
        try:
            worker = WorkerModel.objects.get(user=request.user)
        except WorkerModel.DoesNotExist:
            return Response({"error": "You are not authorized to apply for this job."},
                            status=status.HTTP_403_FORBIDDEN)

        # Check if the job is still pending
        if job.status != 'pending':
            return Response({"error": "This job has already been processed."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Check if this worker has already applied
        if job.worker == worker:
            return Response({"error": "You have already applied for this job."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Assign the worker and update job status to 'accepted'
        job.worker = worker
        job.status = 'accepted'
        job.save()

        return Response({"message": f"Job has been accepted successfully."},
                        status=status.HTTP_200_OK)

class UsersList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            # Retrieve only the logged-in user
            user = User.objects.filter(id=request.user.id).exclude(id__in=WorkerModel.objects.values_list('user_id', flat=True) ).first()

            if user is None:
                return Response({"detail": "User not found or is a worker."}, status=404)

            serializer = UserRegisterSerializer(user)
            return Response(serializer.data, status=200)

        except Exception as e:
            # Return a more generic error message in case of unexpected failures
            return Response({"detail": str(e)}, status=500)


class WorkersList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            # Retrieve the logged-in user
            user = User.objects.filter(id=request.user.id).first()

            if not user:
                return Response({"detail": "User not found."}, status=404)
            
            # Retrieve the corresponding worker details from the Workers table
            worker = WorkerModel.objects.filter(user=user).first()

            if not worker:
                return Response({"detail": "Worker details not found."}, status=404)

            # Serialize user data and worker data
            user_serializer = UserRegisterSerializer(user)
            worker_serializer = WorkerSerializer(worker)

            # Combine the serialized data (user + worker)
            response_data = {**user_serializer.data, **worker_serializer.data}

            return Response(response_data, status=200)

        except Exception as e:
            # Handle any unexpected failures
            return Response({"detail": str(e)}, status=500)
        
class AcceptedJobsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        worker = WorkerModel.objects.get(user=request.user)
        accepted_jobs = JobModel.objects.filter(worker=worker, status='accepted')
        serializer = JobSerializer(accepted_jobs, many=True)
        return Response(serializer.data)

class ProfileView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            # Fetch worker profile associated with the authenticated user
            worker = WorkerModel.objects.get(user=request.user)
            serializer = WorkerSerializer(worker)
            return Response(serializer.data)
        except WorkerModel.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        try:
            worker = WorkerModel.objects.get(user=request.user)
            serializer = WorkerSerializer(worker, data=request.data, partial=True)  # partial=True allows for partial updates
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except WorkerModel.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)


class JobStatusView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Fetch job statuses based on user role (job poster or worker).
        """
        try:
            user = request.user
            # Check if the user is a worker
            if WorkerModel.objects.filter(user=user).exists():
                # Fetch jobs the worker is associated with
                worker = WorkerModel.objects.get(user=user)
                jobs = JobModel.objects.filter(worker=worker).exclude(status='pending')
            else:
                # Fetch jobs posted by the user
                jobs = JobModel.objects.filter(user=user)

            # Serialize the job data
            serializer = JobSerializer(jobs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, *args, **kwargs):
        """
        Update the status of a job to 'completed'.
        """
        try:
            # Retrieve the job ID from request data
            job_id = request.data.get('job_id')
            if not job_id:
                return Response({"error": "Job ID is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch the job by ID
            job = JobModel.objects.get(id=job_id)

            # Check if the logged-in user is the owner of the job
            if job.user != request.user:
                return Response({"error": "You are not authorized to update this job."},
                                status=status.HTTP_403_FORBIDDEN)

            # Update the job status to 'completed'
            job.status = 'completed'
            job.save()

            return Response({"message": f"Job '{job.title}' marked as completed."}, status=status.HTTP_200_OK)

        except JobModel.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class WorkerProfileView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        try:
            print(f"Fetching job with ID: {id}")
            job = JobModel.objects.get(id=id)
            
            if not job.worker:
                return Response({"detail": "No worker assigned to this job."}, status=status.HTTP_404_NOT_FOUND)
            
            worker = job.worker
            print(f"Worker found: {worker.user.username}")  # Adjust to match actual field
            
            serializer = WorkerSerializer(worker)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except JobModel.DoesNotExist:
            return Response({"detail": "Job not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error: {e}")
            return Response({"detail": "An error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class UserNotifyView(APIView):
    def get(self, request):
        notifications = Notification.objects.filter(user=request.user, recipient_type='user').order_by('-timestamp')
        notifications_data = [
            {
                'id': notification.id,
                'message': notification.message,
                'timestamp': notification.timestamp,
                'read': notification.read,
            }
            for notification in notifications
        ]
        return Response(notifications_data, status=status.HTTP_200_OK)


class WorkerNotifyView(APIView):
    def get(self, request):
        worker = request.user  # Assuming a OneToOne relation with `User`
        notifications = Notification.objects.filter(worker=worker, recipient_type='worker').order_by('-timestamp')
        notifications_data = [
            {
                'id': notification.id,
                'message': notification.message,
                'timestamp': notification.timestamp,
                'read': notification.read,
            }
            for notification in notifications
        ]
        return Response(notifications_data, status=status.HTTP_200_OK)
    


class SendNotificationView(APIView):
    def post(self, request):
        # Get the notification data from the request body
        recipient_type = request.data.get('recipient_type')  # 'user' or 'worker'
        recipient_id = request.data.get('recipient_id')  # User ID or Worker ID
        message = request.data.get('message')

        if not recipient_type or not recipient_id or not message:
            return Response({"error": "All fields (recipient_type, recipient_id, message) are required."},
                            status=status.HTTP_400_BAD_REQUEST)

        if recipient_type == 'user':
            try:
                recipient = User.objects.get(id=recipient_id)
                notification = Notification.objects.create(
                    user=recipient,  # Assuming 'user' field for user notifications
                    recipient_type='user',
                    message=message
                )
            except User.DoesNotExist:
                return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        elif recipient_type == 'worker':
            try:
                recipient = WorkerModel.objects.get(id=recipient_id)
                notification = Notification.objects.create(
                    worker=recipient,  # Assuming 'worker' field for worker notifications
                    recipient_type='worker',
                    message=message
                )
            except WorkerModel.DoesNotExist:
                return Response({"error": "Worker not found."}, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({"error": "Invalid recipient_type."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Notification sent successfully."}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def password_reset_request(request):
    try:
        # Get data from request
        username = request.data.get('username')
        email = request.data.get('email')
        
        if not username or not email:
            return Response({"error": "Username and email are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Try to find the user
        user = User.objects.get(username=username, email=email)
        
        # Generate reset token and encode the user's ID
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(str(user.pk).encode())  # Fixed line

        # Create password reset URL
        reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

            # Email subject
        email_subject = 'Password Reset Request'

            # HTML email content
        html_message = f"""
<!DOCTYPE html>
<html>
<body>
    <p>Hi {user.username},</p>
    <p>Click the link below to reset your password:</p>
    <p><a href="{reset_url}">Reset Password</a></p>
    <p>If you did not request this, you can ignore this email.</p>
    <p>Thanks,<br>Service pediya</p>
</body>
</html>
"""


            # Plain-text fallback
        plain_message = f"""Hi {user.username},

            Click the link below to reset your password:

            {reset_url}

            If you did not request this, please ignore this email.

            Thanks,
            [ServicePediya]
            """

            # Send the email
        send_mail(
    email_subject,
    plain_message,  # Plain text version
    settings.DEFAULT_FROM_EMAIL,
    [email],
    html_message=html_message,  # HTML version
)

        print(reset_url)
        return Response({"message": "Check Your Email for Password Reset"}, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User with this username and email does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        # Log the exception
        print(f"Error: {e}")
        return Response({"error": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def password_reset_confirm(request, uidb64, token):
    try:
        # Decode the uid to get the user ID
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)

        # Check if the token is valid
        if default_token_generator.check_token(user, token):
            new_password1 = request.data.get('new_password1')  # Get new password
            new_password2 = request.data.get('new_password2')  # Get confirm password

            # Check if both passwords are provided
            if not new_password1 or not new_password2:
                return Response({"error": "Both password fields are required"}, status=status.HTTP_400_BAD_REQUEST)

            # Ensure passwords match
            if new_password1 != new_password2:
                return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

            # Create the SetPasswordForm to validate and save the new password
            form = SetPasswordForm(user, {'new_password1': new_password1, 'new_password2': new_password2})

            if form.is_valid():
                form.save()  # Save the new password
                return Response({"message": "Password has been reset successfully"}, status=status.HTTP_200_OK)
            else:
                # Return the form errors (e.g., password strength errors)
                return Response({"error": form.errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    
class UserFeedbackView(APIView):
    def post(self, request):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Thank you for your feedback!"}, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Admin View for Viewing Feedback
class AdminFeedbackView(APIView):
    def get(self, request):
        feedbacks = Feedback.objects.all().order_by('-created_at')  # Latest first
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CancelJobView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, job_id):
        try:
            # Get the job instance
            job = JobModel.objects.get(id=job_id, worker=request.user)
            
            # Update the job's status to "pending"
            job.status = 'pending'
            job.save()

            return Response({"message": "Job successfully canceled."}, status=status.HTTP_200_OK)

        except JobModel.DoesNotExist:
            return Response({"error": "Job not found or not authorized to modify."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)





            
      




        



        
       
