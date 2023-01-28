from django.db import models

class candidateInfo(models.Model):
    SCHOOL_YEAR_CHOICES = [
        ('F', 'Freshman'),
        ('S', 'Sophomore'),
        ('J', 'Junior'),
        ('S', 'Senior'),
        ('G', 'Graduate'),
    ]
    name = models.CharField(max_length=50)
    schoolYear = models.CharField(
        max_length=1,
        choices=SCHOOL_YEAR_CHOICES,
    )
    major = models.CharField(max_length=50)
    skills = models.JSONField()
    experiences = models.JSONField()