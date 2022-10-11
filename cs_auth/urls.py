from django.urls import include
from django.urls import path
from cs_auth.views import MyObtainTokenPairView, RegisterUserView, recaptcha, LiveGameView, GameHighlightView, CommentLiveGameListView, CommentLiveGameView, CommentGameHighlightListView, CommentGameHighlightView,ChangePasswordView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r"", LiveGameView, "livegame")

router1 = routers.DefaultRouter()
router1.register(r"", GameHighlightView, "gamehighlight")

router2 = routers.DefaultRouter()
router2.register(r"", CommentLiveGameView, "livecomment")

router3 = routers.DefaultRouter()
router3.register(r"", CommentGameHighlightView, "highlightcomment")


# creating routing urls for api
urlpatterns = [
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUserView.as_view(), name='auth_register'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),

    path('livegame/', include(router.urls)),
    path('gamehighlight/', include(router1.urls)),
    path('livecomments/', include(router2.urls)),
    path('highlightcomments/', include(router3.urls)),
    path('listlivecomments/', CommentLiveGameListView.as_view(),
         name='live_list_comments'),
    path('listhighlightcomments/', CommentGameHighlightListView.as_view(),
         name='highlight_list_comments'),


    path('recaptcha/', recaptcha)  # url for captcha
]
