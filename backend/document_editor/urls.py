from .views import FilesTreeView
from django.urls import path

urlpatterns = [
    path('tree/', FilesTreeView.as_view()),
]