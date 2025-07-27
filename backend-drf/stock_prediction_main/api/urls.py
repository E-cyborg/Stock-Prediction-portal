from django.urls import path
from accounts.views import UserRegistrationView
                            
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registration/',UserRegistrationView.as_view()),
    # path('login/',UserLoginView.as_view()),
]
