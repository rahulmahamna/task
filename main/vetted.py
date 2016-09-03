import json
from django.http import Http404, HttpResponse
import clearbit

clearbit.key = 'sk_3cf5b2e87aa3fce9045926c882389c02'

# function to search the company through Clearbit Enrichment API
def search(request):
    if request.is_ajax():
        search_term = request.GET.get("item") #search term which user entered
        company = clearbit.Company.find(domain=search_term) #getting the details of the company through API
        data_list = []
        if company != None and 'pending' not in company:
            print "Name: " + company['name']
            data_list.append(company)
            with open("main/companies.txt", "r") as f: #checking whether file is have the company name which user entered
                d = f.readlines()
                for line in d:
                    if line.strip("\n") == search_term:
                        data_list.append("present")
            data = json.dumps(data_list)
    return HttpResponse(data, content_type='application/json')

#function to add companyies in user's list
def add_companies_in_file(request):
    send_response = ""
    count = 0
    term = (request.GET.get('item')).encode("utf-8") # user input was in json format, encoded the json input using encode("utf-8")

    with open("main/companies.txt", "r") as f: #opening file to check whether company entered is already in user's list or not
        d = f.readlines()
        for line in d:
            stripedline = line.strip('\n')
            if term == stripedline :
                count = 1
                break
            else:
                count = 0

    if(count == 1):
        send_response = "Already Added"
        response = json.dumps(send_response)
    else:
        with open("main/companies.txt", "a") as f:
            f.write(request.GET.get('item')+"\n")
            send_response = "Added Now"
            response = json.dumps(send_response)
    return HttpResponse(response, content_type='application/json')

# function to remove company from user's list
def remove_companies_from_file(request):
    domains_file = []
    value = request.GET.get("item")
    #opening file twice
    # on first open, appending the companies name except the one which user wants to delete
    # on second open, writing the text file usign the list domains_file
    with open("main/companies.txt", "r") as f:
        d = f.readlines()
        for i in d:
            if i.strip('\n') != (request.GET.get("item")).strip('\n'):
                domains_file.append(i)

    with open("main/companies.txt", "w") as f:
        i = 0
        for i in range(len(domains_file)):
            f.write(domains_file[i])

    data = json.dumps("done")
    return HttpResponse(data, content_type='application/json')

# function to show all the companies which the user added
def show_company_list(request):
    with open("main/companies.txt", "r") as f:
        d = f.readlines()
        line_count = 0
        line_no = int((request.GET.get('line_no')).encode("utf-8"))
        data_list = []
        for line in d:
            stripedline = line.strip('\n')
            if stripedline is not None:
                if line_no == line_count:
                    company = clearbit.Company.find(domain=stripedline)
                    if company != None and 'pending' not in company:
                        data_list.append(company)
                        data_list.append("present")
                        data = json.dumps(data_list)
                        return HttpResponse(data, content_type='application/json')
                else:
                    line_count += 1
            else:
                data = json.dumps('None');
                return HttpResponse(data, content_type='application/json')
