from rest_framework import serializers
from .models import SplunkObject, CustomLabel, SearchQuery
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class CustomLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomLabel
        fields = '__all__'  # Serialize all fields for CustomLabel model

class SplunkObjectSerializer(serializers.ModelSerializer):
    custom_meta_labels = CustomLabelSerializer(many=True, read_only=True)

    class Meta:
        model = SplunkObject
        fields = '__all__'  # Serialize all fields for SplunkObject model

        
class SearchQuerySerializer( serializers.ModelSerializer):
    class Meta:
        model = SearchQuery
        fields = '__all__'

