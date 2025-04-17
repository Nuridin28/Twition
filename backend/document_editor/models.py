from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Folder(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='folders')
    parent = models.ForeignKey('self', blank=True, null=True, on_delete=models.CASCADE, related_name='children')

class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

class Document(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    tags = models.ManyToManyField(Tag, blank=True, related_name='documents')
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='documents')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

