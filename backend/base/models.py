from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class candidateInfo(models.Model):
    SCHOOL_YEAR_CHOICES = [
        ('F', 'Freshman'),
        ('S', 'Sophomore'),
        ('J', 'Junior'),
        ('S', 'Senior'),
        ('G', 'Graduate'),
    ]
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE, default=None)
    name = models.CharField(max_length=50)
    schoolYear = models.CharField(
        max_length=1,
        choices=SCHOOL_YEAR_CHOICES,
    )
    major = models.CharField(max_length=50)
    skills = models.JSONField()
    experiences = models.JSONField()

@receiver(post_save, sender=User)
def userCreated(sender, instance, created, **kwargs):
    if created:
        candidateInfo.objects.create(user=instance, skills={}, experiences={})
    else:
        instance.profile.save()