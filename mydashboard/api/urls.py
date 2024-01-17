from django.urls import path
from . import views



urlpatterns = [
    path('', views.getroutes, name= "routes"),
    path('overview/', views.overview, name='overview'),  # list of dashboard
    path('description/', views.getDescription, name= "description"),
    path('custom_label_list/', views.custom_label_list, name= "custom_label_list"),
    path('description/<str:pk>/', views.getDescriptionpk, name= "descriptionpk"),  
    path('search/<str:search_term>/', views.search, name='search'),
    path('api/search-history/', views.search_history_api, name='search-history-api'),
    path('api/overview/', views.overviewdropdown, name='overviewdropdown'),
    path('post/<str:classification>/', views.add_classification, name='add_classification'),   
]