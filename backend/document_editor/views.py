from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework.views import APIView
from rest_framework import permissions
from  rest_framework import status

from .serilizers import *

from .models import *

# Create your views here.
class FilesTreeView(APIView):
    permission_classes = [permissions.AllowAny]

    @staticmethod
    def get_object():
        folders = Folder.objects.all()

        def construct_tree():
            tree = []
            for folder in folders:
                if folder.parent is None:
                    tree.append(folder)

            return tree

        return construct_tree()

    def get(self, request):
        folderSerilizer = FolderSerializer(self.get_object(), many=True)
        return Response(folderSerilizer.data)
