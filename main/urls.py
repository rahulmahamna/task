from django.conf.urls import patterns, url
from django.views.generic import TemplateView
from django.views.generic import RedirectView
from . import views

urlpatterns = patterns('main',
        url(r'^vetted/fetchcompanyname/$', 'vetted.fetchcompanyname'),
        url(r'^vetted/search/$', 'vetted.search'),
        url(r'^vetted/knowmoredetails/$', 'vetted.search'),
        url(r'^vetted/add_companies_in_file/$', 'vetted.add_companies_in_file'),
        url(r'^vetted/remove_companies_from_file/$', 'vetted.remove_companies_from_file'),
        url(r'^vetted/show_company_list/', 'vetted.show_company_list'),
        url(r'^vetted/knowmore/', views.knowmore, name='knowmore'),
        url(r'', views.index, name='index'),
        url(r'^index/$', views.index, name='index'),
    )
