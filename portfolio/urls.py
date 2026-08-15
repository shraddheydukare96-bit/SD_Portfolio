from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('', views.home_view, name='home'),
    path('contact/submit/', views.submit_contact_form, name='submit_contact'),
]