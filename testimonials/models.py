from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from account.models import CustomUser  # Adjust import as necessary

class Testimonial(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    rating = models.IntegerField(
        default=0,
        validators=[
            MinValueValidator(0),  # Minimum value
            MaxValueValidator(10)   # Maximum value
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    # Optional: If you want to have a separate username field
    # username = models.CharField(max_length=255, blank=True, null=True)

    # def save(self, *args, **kwargs):
    #     # Set the username field from the user before saving
    #     if self.user:
    #         self.username = self.user.username
    #     super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.content[:20]}"
