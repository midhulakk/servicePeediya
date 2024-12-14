from rest_framework import serializers
from .models import WorkerModel,JobModel,Feedback,Notification
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password"]
    def create(self,validated_data):
        return User.objects.create_user(**validated_data)
    
class WorkerSerializer(serializers.ModelSerializer):
    is_approved=serializers.BooleanField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    class Meta:
        model=WorkerModel
        fields='__all__'

    def create(self, validated_data):
        request_user = self.context['request'].user
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['user'] = request_user
        return super().create(validated_data)

class JobSerializer(serializers.ModelSerializer):
    worker = WorkerSerializer(read_only=True)  
    user = serializers.CharField(read_only=True)
    username = serializers.CharField(source='user.username', read_only=True) 
    class Meta:
        model=JobModel
        fields='__all__'

    def create(self, validated_data):
        user=self.context.get("user")
        return JobModel.objects.create(user=user,**validated_data)
    
    def update(self, instance, validated_data):
        # Prevent direct status change unless specifically allowed
        if 'status' in validated_data and validated_data['status'] not in ['pending', 'accepted']:
            raise serializers.ValidationError("Invalid status update.")
        return super().update(instance, validated_data)
    
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
