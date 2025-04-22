from .views import FilesTreeView, FolderView, DocumentView
from django.urls import path

urlpatterns = [
    path('tree/', FilesTreeView.as_view()),
    path('folder/', FolderView.as_view()),
    path('folder/<int:id>', FolderView.as_view()),
    path('document/', DocumentView.as_view()),
]