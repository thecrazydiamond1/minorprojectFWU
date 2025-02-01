
from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework.authtoken.models import Token as BaseToken
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.db.models.signals import post_save
import uuid

class CustomUser(AbstractUser):
    email=models.EmailField(unique=True)
    is_client = models.BooleanField(default=False)
    is_worker = models.BooleanField(default=False)
    kyc_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_expiration = models.DateTimeField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    def __str__(self):
     return self.username
    pass
class Token(BaseToken):
    class Meta:
        db_table = 'auth_token'


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)