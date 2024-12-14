from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class WorkerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    phone=models.PositiveIntegerField()
    location=models.CharField(max_length=100)
    pin=models.PositiveIntegerField()
    SKILL_CHOICES = [
        ('plumber', 'Plumber'),
        ('electrician', 'Electrician'),
        ('cleaner', 'Cleaner'),
        ('gardener', 'Gardener'),
        ('carpenter', 'Carpenter'),
        ('painter', 'Painter'),
        ('welder', 'Welder'),
        ('mechanic', 'Mechanic'),
        ('cook', 'Cook'),
        ('driver', 'Driver'),
    ]
    skills=models.CharField(max_length=100,choices=SKILL_CHOICES)
    certification=models.FileField(upload_to='certificates/', blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    is_approved=models.BooleanField(default=False)
    registered_at = models.DateTimeField(auto_now_add=True , null=True) 

    def __str__(self):
        return f"{self.user.username}"


class JobModel(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('completed', 'Completed'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_jobs')  # Job poster
    worker = models.ForeignKey(WorkerModel, on_delete=models.SET_NULL, related_name='assigned_jobs', null=True, blank=True)  # Assigned worker
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    pin=models.PositiveIntegerField()
    date_posted = models.DateTimeField(auto_now_add=True)
    date_required = models.DateField()
    skill = models.CharField(max_length=100, choices=WorkerModel.SKILL_CHOICES, null=True)  # New field for skill in JobModel
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applicants = models.ManyToManyField(WorkerModel, related_name='job_applications', blank=True)
    

    def apply_to_job(self, worker):
        """Allow a worker to apply for the job."""
        if self.status != 'pending':
            raise ValueError("Applications are only allowed for pending jobs.")
        if self.applicants.filter(id=worker.id).exists():
            raise ValueError("This worker has already applied for the job.")
        self.applicants.add(worker)
        return f"Worker {worker.user.username} has successfully applied for the job."

    def assign_worker(self, worker):
        """Assign a worker to the job."""
        if self.status != 'pending':
            raise ValueError("The job can only be assigned while pending.")
        if not self.applicants.filter(id=worker.id).exists():
            raise ValueError("This worker has not applied for the job.")
        self.worker = worker
        self.status = 'pending'  # Keep it pending until the worker accepts.
        self.save()
        return f"Worker {worker.user.username} has been assigned to the job '{self.title}'."

    def accept_job(self, worker):
        """Accept the job by the assigned worker."""
        if self.status != 'pending':
            raise ValueError("This job has already been processed.")
        if self.worker != worker:
            raise ValueError("This worker is not assigned to the job.")
        self.status = 'accepted'
        self.save()
        return f"Job '{self.title}' has been accepted by {worker.user.username}."

    def mark_completed(self):
        """Mark the job as completed."""
        if self.status != 'accepted':
            raise ValueError("Only accepted jobs can be marked as completed.")
        self.status = 'completed'
        self.save()
        return f"Job '{self.title}' has been marked as completed."

    def cancel_job(self):
        """Cancel the job."""
        if self.status == 'completed':
            raise ValueError("Completed jobs cannot be cancelled.")
        self.status = 'cancelled'
        self.save()
        return f"Job '{self.title}' has been cancelled."

    def __str__(self):
        return f"Job: {self.title} by {self.user.username} (Status: {self.status})"


# WorkerModel and JobModel remain unchanged as provided earlier.

class Notification(models.Model):
    RECIPIENT_CHOICES = [
        ('user', 'User'),
        ('worker', 'Worker'),
    ]

    STATUS_CHOICES = [
        ('unread', 'Unread'),
        ('read', 'Read'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)
    worker = models.ForeignKey('WorkerModel', on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)
    title = models.CharField(max_length=255)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    recipient_type = models.CharField(max_length=10, choices=RECIPIENT_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='unread')

    def mark_as_read(self):
        """Mark the notification as read."""
        self.status = 'read'
        self.save()
        return f"Notification '{self.title}' marked as read."

    def __str__(self):
        recipient = self.user.username if self.recipient_type == 'user' else self.worker.user.username
        return f"Notification for {recipient}: {self.title} (Status: {self.status})"
    
from django.db import models

class Feedback(models.Model):
    name = models.CharField(max_length=100)  # User's name
    email = models.EmailField()  # User's email
    message = models.TextField()  # Feedback message
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set the timestamp when feedback is created

    def __str__(self):
        return f"Feedback from {self.name} ({self.email})"

