import requests
from .serialiizers import ChangePasswordSerializer, CommentLiveGameListSerializer, CommentLiveGameSerializer, CommentGameHighlightListSerializer, CommentGameHighlightSerializer, MyTokenObtainPairSerializer, RegisterSerializer, LiveGameSerializer, GameHighlightSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import IsAuthenticated   
from .models import Comment, CommentGameHighlight, LiveGame, GameHighlight

# obtain token


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

# register user view


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class LiveGameView(viewsets.ModelViewSet):
    serializer_class = LiveGameSerializer
    queryset = LiveGame.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['game_title', 'team1', 'team2']


class GameHighlightView(viewsets.ModelViewSet):
    serializer_class = GameHighlightSerializer
    queryset = GameHighlight.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['game_title', 'team1', 'team2']


class CommentLiveGameListView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentLiveGameListSerializer
    pagination_class = None


class CommentLiveGameView(viewsets.ModelViewSet):
    serializer_class = CommentLiveGameSerializer
    queryset = Comment.objects.all()


class CommentGameHighlightListView(generics.ListAPIView):
    queryset = CommentGameHighlight.objects.all()
    serializer_class = CommentGameHighlightListSerializer
    pagination_class = None


class CommentGameHighlightView(viewsets.ModelViewSet):
    serializer_class = CommentGameHighlightSerializer
    queryset = CommentGameHighlight.objects.all()


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Old password is wrong."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# for google captcha


@api_view(['POST'])
def recaptcha(request):
    r = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data={
            'secret': '6LfgFn0gAAAAAMnaUkI3GUUwKeWzCjq5GGM8FCVb',
            'response': request.data['captcha_value'],
        }
    )

    return Response({'captcha': r.json()})
