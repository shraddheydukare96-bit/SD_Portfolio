from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST

from .models import (
    Profile,
    Skill,
    Project,
    Certificate,
    Education,
    ContactMessage,
)


def home_view(request):
    """
    Renders the portfolio home page.
    """

    # Profile / Resume
    profile = Profile.objects.first()

    # Portfolio data
    skills = Skill.objects.all()
    projects = Project.objects.all()
    certificates = Certificate.objects.all()
    education = Education.objects.all()

    context = {
        "profile": profile,
        "skills": skills,
        "projects": projects,
        "certificates": certificates,
        "education": education,
    }

    return render(
        request,
        "index.html",
        context
    )


@require_POST
def submit_contact_form(request):
    """
    Handles contact form submissions.
    """

    name = request.POST.get("name", "").strip()
    email = request.POST.get("email", "").strip()
    message = request.POST.get("message", "").strip()

    if not name or not email or not message:
        return JsonResponse(
            {
                "status": "error",
                "message": "All fields are required."
            },
            status=400
        )

    ContactMessage.objects.create(
        name=name,
        email=email,
        message=message
    )

    return JsonResponse(
        {
            "status": "success",
            "message": "Thank you! Your message has been sent."
        }
    )