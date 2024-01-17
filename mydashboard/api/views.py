from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from rest_framework.response import Response
from .serializers import CustomLabelSerializer, SplunkObjectSerializer, SearchQuerySerializer
from . models import SplunkObject, CustomLabel, SearchQuery
from django.db.models import Q
from django.views.decorators.http import require_GET
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.decorators import login_required
# Create your views here.

@api_view(['GET'])
def getroutes(request):
    Structures = [ "WELCOME TO SPLUNK UI" ]
    return Response(Structures)

#1.
@api_view(['GET'])   # This feature will return the overview
def overview(request):
    # Get distinct types from SplunkObject model
    # types = SplunkObject.objects.values_list('type', flat=True).distinct()
    # types_list = list(available_types)

    try:
        # Get distinct types from SplunkObject model
        available_types = SplunkObject._meta.get_field('type').choices
        types_list = [choice[0] for choice in available_types]

        # Count the number of objects for each type
        type_counts = {}
        for obj_type in types_list:
            count = SplunkObject.objects.filter(type=obj_type).count()
            type_counts[obj_type] = count

        return JsonResponse({'type_counts': type_counts})

    except Exception as e:
        return JsonResponse({'error': str(e)})

# 2.
@api_view(['GET'])
def getDescription(request):
    splunk_objects = SplunkObject.objects.all()
    serializer = SplunkObjectSerializer(splunk_objects, many=True)
    return Response(serializer.data)

# 3.
@api_view(['GET'])
def custom_label_list(request):
    custom_labels = CustomLabel.objects.all()
    serializer = CustomLabelSerializer(custom_labels, many=True)
    return Response(serializer.data)

# 4.
@api_view(['GET'])
def getDescriptionpk(request, pk):
    splunk_object = SplunkObject.objects.get(id = pk)
    serializer = SplunkObjectSerializer(splunk_object)
    return Response(serializer.data)



# 5.
@api_view(['GET'])
def search(request, search_term):
    # Search across all fields for the given search term
    splunk_objects = SplunkObject.objects.filter(
        Q(splunk_host__icontains=search_term) |
        Q(type__icontains=search_term) |
        Q(name__icontains=search_term) |
        Q(description__icontains=search_term) |
        Q(owner__icontains=search_term) |
        Q(custom_meta_labels__label_name__icontains=search_term)
    ).distinct()

    if not splunk_objects:
        return Response({'message': 'Not found'}, status=404)

    serializer = SplunkObjectSerializer(splunk_objects, many=True)
    print('a')
    SearchQuery.objects.create(query=search_term)
    return Response(serializer.data)

# 6.
@api_view(['GET'])
def search_history_api(request):
    # Retrieve all search queries stored in the database
    search_queries = SearchQuery.objects.all().order_by('-created_at')  # Get queries ordered by creation time (newest first)

    # Serialize the search queries
    serializer = SearchQuerySerializer(search_queries, many=True)  # Use the appropriate serializer

    return Response(serializer.data)

# 7.
@api_view(['GET'])
def overviewdropdown(request):
    try:
        splunk_object_types = [
            obj[0] for obj in SplunkObject.SPLUNK_OBJECT_TYPES
        ]
        return Response({'types': splunk_object_types})
    except Exception as e:
        return Response({'error': str(e)}, status=500)

# 8.
@api_view(['POST'])
def add_classification(request, classification):
    # Check if the classification is valid
    valid_classifications = ['top secret', 'top secret/sci', 'secret', 'confidential', 'unclassified']
    
    if classification not in valid_classifications:
        return Response({'message': 'Invalid classification'}, status=400)

    # Create or update the classification for SplunkObject instances
    splunk_objects = SplunkObject.objects.all()
    splunk_objects.update(classification=classification)

    return Response({'message': f'Classification set to {classification} for all SplunkObjects'})
