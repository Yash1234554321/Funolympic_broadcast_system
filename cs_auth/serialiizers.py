from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Comment, CommentGameHighlight, LiveGame, GameHighlight


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    refresh = serializers.CharField(read_only=True)
    access = serializers.CharField(read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    id = serializers.UUIDField(read_only=True)

    def validate(self, attrs):
        data = super(MyTokenObtainPairSerializer, self).validate(attrs)

        data.update(
            {
                "username": self.user.username,
                "email": self.user.email,
                "id": self.user.id,
            }
        )
        return data

# creating serializers for Register


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        # to make sure username is unique
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    email = serializers.EmailField(
        required=True,
        # to make sure email is unique
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    # validate password
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {
            'username': {'required': True},  # username field is required
            'email': {'required': True},  # email field is required
            'password': {'required': True},  # password field is required
            'password2': {'required': True},  # password2 field is required
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:  # check if both passwords match
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    # create a user
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


# creating serializers for LiveGame
class LiveGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiveGame
        fields = "__all__"

# creating serializers for GameHighlight


class GameHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameHighlight
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

# creating serializers for Comment


class CommentLiveGameListSerializer(serializers.ModelSerializer):
    live_game = LiveGameSerializer()
    author = UserSerializer()

    class Meta:
        model = Comment
        fields = ["live_game", "content", "author"]


# creating serializers for Comment
class CommentLiveGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


# creating serializers for Comment
class CommentGameHighlightListSerializer(serializers.ModelSerializer):
    live_game = LiveGameSerializer()
    author = UserSerializer()

    class Meta:
        model = CommentGameHighlight
        fields = ["live_game", "content", "author"]


# creating serializers for Comment
class CommentGameHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentGameHighlight
        fields = "__all__"


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
