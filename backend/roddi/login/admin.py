from django.contrib import admin
from .models import User, Estate

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')


class EstateAdmin(admin.ModelAdmin):
    list_display = ('name', )



admin.site.register(User, UserAdmin)
admin.site.register(Estate, EstateAdmin)