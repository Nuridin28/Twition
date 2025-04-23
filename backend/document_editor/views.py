from gc import get_objects

from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import status

from .serilizers import *

from .models import *


def build_folder(folder):
    return {
        'id': folder.id,
        'authorId': folder.author.id,
        'title': folder.title,
        'type': 'folder',
        'expanded': False,
        'parent': None,
        'children': []
    }
# Create your views here.

class FilesTreeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def get_object():
        return Folder.objects.all()

    def get(self, request):
        def serialize_document(document):
            if document.folder is None:
                folder_id = None
            else:
                folder_id = document.folder.id
            return {
                'id': document.id,
                'title': document.title,
                'content': document.content,
                'author': document.author.id,
                'tags': [],
                'folderId': folder_id,
                'createdAt': document.created_at,
                'updatedAt': document.updated_at,
                'type': 'document'
            }

        def build_folder_tree(folder):
            return {
                'id': folder.id,
                'authorId': folder.author.id,
                'title': folder.title,
                'type': 'folder',
                'expanded': False,
                'parent': None,
                'children': [build_folder_tree(child) for child in folder.children.all()] +
                [serialize_document(document) for document in folder.documents.all()]
            }
        root_folders = Folder.objects.filter(parent=None)
        root_documents = Document.objects.filter(folder=None)
        data = ([serialize_document(document) for document in root_documents] +
                [build_folder_tree(folder) for folder in root_folders])
        # print(data)
        return Response(data)

class FolderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = FolderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id=None):
        folder = Folder.objects.get(id=id)
        return Response(build_folder(folder))

    def put(self, request):
        serializer = FolderSerializer(instance=Folder.objects.get(id=request.data['id']),
                                      data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        folder = Folder.objects.get(id=id)
        if folder:
            folder.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class DocumentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request):
        serializer = DocumentSerializer(
            instance=Document.objects.get(id=request.data["id"]),
            data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)