from django.urls import path
from accounts.views import (UserRegistrationView,
                            # UserLoginSerializer
                            )



urlpatterns = [
    path('registration/',UserRegistrationView.as_view()),
    # path('login/',UserLoginView.as_view()),
]
