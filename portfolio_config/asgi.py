"""
ASGI config for portfolio_config project.
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_config.settings')

application = get_asgi_application()