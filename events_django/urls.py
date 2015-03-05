from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'event_display.views.home', name='home'),
    url(r'^scrape/', 'event_scraper.views.scrape', name='scrape'),

)
