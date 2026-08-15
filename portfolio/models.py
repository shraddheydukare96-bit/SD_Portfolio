from django.db import models
from cloudinary_storage.storage import RawMediaCloudinaryStorage

class Profile(models.Model):
    name = models.CharField(max_length=150)

    resume = models.FileField(
        upload_to="resume/",
        storage=RawMediaCloudinaryStorage(),
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=100)

    icon_class = models.CharField(
        max_length=100,
        help_text="Example: fa-brands fa-java"
    )

    description = models.TextField()

    proficiency_percentage = models.PositiveIntegerField(
        default=70
    )

    order = models.PositiveIntegerField(
        default=0
    )

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)

    category = models.CharField(
        max_length=100
    )

    description = models.TextField()

    icon_class = models.CharField(
        max_length=100,
        default="fa-solid fa-code"
    )

    technologies = models.CharField(
        max_length=300,
        help_text="Comma separated: Python, Django, HTML, CSS"
    )

    github_link = models.URLField(
        blank=True,
        null=True
    )

    live_link = models.URLField(
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["order", "-created_at"]

    def get_tech_list(self):
        return [
            tech.strip()
            for tech in self.technologies.split(",")
            if tech.strip()
        ]

    def __str__(self):
        return self.title


class Certificate(models.Model):
    title = models.CharField(
        max_length=200
    )

    issuer = models.CharField(
        max_length=150
    )

    image = models.ImageField(
        upload_to='certificates/',
        blank=True,
        null=True
    )

    description = models.TextField()

    icon_class = models.CharField(
        max_length=100,
        default="fa-solid fa-certificate"
    )

    certificate_link = models.URLField(
        blank=True,
        null=True
    )

    issued_date = models.CharField(
        max_length=50,
        default="Verified"
    )

    order = models.PositiveIntegerField(
        default=0
    )

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.title} - {self.issuer}"


    
class Education(models.Model):
    degree = models.CharField(
        max_length=200
    )

    institution = models.CharField(
        max_length=250
    )

    duration = models.CharField(
        max_length=100
    )

    description = models.TextField()

    order = models.PositiveIntegerField(
        default=0
    )

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class ContactMessage(models.Model):
    name = models.CharField(
        max_length=150
    )

    email = models.EmailField()

    message = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    is_read = models.BooleanField(
        default=False
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Message from {self.name}"