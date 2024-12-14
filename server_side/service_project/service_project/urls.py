"""
URL configuration for service_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from service_app import views
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.authtoken.views import obtain_auth_token

router=DefaultRouter()
router.register('user',views.UserRegisterView,basename='user_view')
router.register('user/jobpost',views.JobPosting,basename='job_post')
router.register('workers',views.WorkerView,basename='worker_view')
router.register('jobmatch',views.JobMatchingView,basename='job_match')



urlpatterns = [
    path('admin/', admin.site.urls),
    path("token/",obtain_auth_token),
    path('user/logout/', views.UserLogoutView.as_view(), name='user_logout'), 
    path('workreg/', views.WorkerRegistrationView.as_view(), name='worker_reg'), 
    path('approve/<int:worker_id>/', views.AdminApprovalView.as_view(), name='admin_approve'),
    path('worklog/', views.WorkerLoginView.as_view(), name='worker_login'),
    path('jobs/apply/<int:id>/', views.ApplyJob.as_view(), name='apply_job'),
    path('userslist/', views.UsersList.as_view(), name='users_list'),
    path('workerslist/', views.WorkersList.as_view(), name='workers_list'),
    path('newworkernotify/', views.NewWorkerNotificationView.as_view(), name='workers_notify'),
    path('acceptedjobs/', views.AcceptedJobsView.as_view(), name='accepted_jobs'),
    path('profile/', views.ProfileView.as_view(), name='profile_view'),
    path('jobstatus/', views.JobStatusView.as_view(), name='job_status'),
    path('workerprofile/<int:id>/', views.WorkerProfileView.as_view(), name='worker_profile'),
    path('usernotify/', views.UserNotifyView.as_view(), name='user_notify'),
    path('workernotify/', views.WorkerNotifyView.as_view(), name='worker_notify'),
    path('sendnotify/', views.SendNotificationView.as_view(), name='send_notification'),
    path('api/password-reset/', views.password_reset_request, name='password_reset_request'),
    path('api/password-reset/confirm/<uidb64>/<token>/', views.password_reset_confirm, name='password_reset_confirm'),
    path('feedback/user/', views.UserFeedbackView.as_view(), name='user-feedback'),
    path('feedback/admin/', views.AdminFeedbackView.as_view(), name='admin-feedback'),
    path('jobs/<int:job_id>/cancel/', views.CancelJobView.as_view(), name='cancel-job'),



]+router.urls+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
