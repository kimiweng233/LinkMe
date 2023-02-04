from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from base.models import candidateInfo

admin.site.register(candidateInfo)

class candidateInfoInline(admin.StackedInline):
    model = candidateInfo
    can_delete = False
    verbose_name_plural = 'candidateInfo'

class UserAdmin(BaseUserAdmin):
    inlines = [candidateInfoInline]

admin.site.unregister(User)
admin.site.register(User, UserAdmin)