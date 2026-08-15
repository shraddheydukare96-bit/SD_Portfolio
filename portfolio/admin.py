from django.contrib import admin

from .models import (
    Profile,
    Skill,
    Project,
    Certificate,
    Education,
    ContactMessage,
)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "resume")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "proficiency_percentage",
        "order",
    )

    list_editable = (
        "proficiency_percentage",
        "order",
    )

    search_fields = ("name",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "order",
        "created_at",
    )

    list_editable = ("order",)

    list_filter = ("category",)

    search_fields = (
        "title",
        "technologies",
        "description",
    )


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "issuer",
        "issued_date",
        "order",
    )

    list_editable = ("order",)

    search_fields = (
        "title",
        "issuer",
    )


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = (
        "degree",
        "institution",
        "duration",
        "order",
    )

    list_editable = ("order",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "created_at",
        "is_read",
    )

    list_filter = (
        "is_read",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "message",
    )

    readonly_fields = (
        "name",
        "email",
        "message",
        "created_at",
    )