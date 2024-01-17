from django.contrib import admin

# Register your models here.
from .models import SplunkObject, CustomLabel

admin.site.register(SplunkObject)
admin.site.register(CustomLabel)