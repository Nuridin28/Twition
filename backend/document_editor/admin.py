from django.contrib import admin

# Register your models here.
from document_editor.models import *

admin.site.register(Document)
admin.site.register(Folder)
admin.site.register(Tag)