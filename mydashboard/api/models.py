from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
# Create your models here.

class SplunkObject(models.Model):
    SPLUNK_OBJECT_TYPES = [
        ('Dashboard', 'Dashboard'),
        ('Report', 'Report'),
        ('Lookup', 'Lookup'),
        ('App', 'App'),
        # Add other types as needed
    ]

    SPLUNK_ACTION_TYPES = [
        ('delete', 'delete'),
        ('Share', 'Share'),
    ]

    SPLUNK_CUSTOM_FIELDS = [
        ('top secret', 'Top Secret'),
        ('top secret/sci', 'Top Secret/SCI'),
        ('secret', 'Secret'),
        ('confidential', 'Confidential'),
        ('unclassified', 'Unclassified'),
    ]

    splunk_host = models.CharField(max_length=100)
    type = models.CharField(choices=SPLUNK_OBJECT_TYPES, max_length=20)
    name = models.CharField(max_length=100)
    description = models.TextField()
    owner = models.CharField(max_length=100)
    action_type = models.CharField(choices = SPLUNK_ACTION_TYPES, max_length = 20, null = True)
    custom_fields = models.CharField(choices = SPLUNK_CUSTOM_FIELDS, max_length = 20, null = True)
    # Add other fields as required

    # Custom Metadata Labels as ManyToManyField (assuming each label is predefined)
    custom_meta_labels = models.ManyToManyField('CustomLabel')

class CustomLabel(models.Model):
    label_name = models.CharField(max_length=50)
    # Add any other label-related fields as needed

    def __str__(self):
        return self.label_name

class SearchQuery(models.Model):
    query = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.query
    
