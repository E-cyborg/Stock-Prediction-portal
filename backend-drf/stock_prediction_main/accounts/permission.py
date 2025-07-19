from rest_framework import permissions

class IsNotAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user or not request.user.is_authenticated