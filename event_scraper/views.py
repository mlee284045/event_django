from django.shortcuts import render
from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests, re, json
from bs4 import BeautifulSoup


@csrf_exempt
def scrape(request):
    if request.method == 'POST':
        data = request.body

    elif request.method == 'GET':
        return render(request, 'test.html')
    else:
        return HttpResponseBadRequest
    target_url = data

    # Can be separated out into separate function
    # But for now we just use it inside here

    html_doc = requests.get(target_url)
    soup = BeautifulSoup(html_doc.text)
    all_events = []
    multi_date = re.compile(r'(\w+) (\d+), (\d+) .* (\w+) (\d+), (\d+)')
    single_date = re.compile(r'(\w+) (\d+), (\d+).')
    time = re.compile(r'(\d+:\d+) (\w\w)')

    links = soup.find_all('a', href=re.compile('events'))

    for x in links:
        event = {}
        if x.h3 and x.strong:
            event['title'] = x.h3.text.strip()
            text = x.strong.text.strip()

            multi_result = multi_date.search(text)
            if multi_result:
                event['start'] = {
                    "month": multi_result.group(1),
                    "day": multi_result.group(2),
                    "year": multi_result.group(3),
                }
                event['end'] = {
                    "month": multi_result.group(4),
                    "day": multi_result.group(5),
                    "year": multi_result.group(6),
                }
            single_result = single_date.search(text)
            if single_result:
                event['start'] = {
                    "month": single_result.group(1),
                    "day": single_result.group(2),
                    "year": single_result.group(3),
                }
            time_result = time.search(text)
            if time_result:
                event['start']['time'] = time_result.group(0)
            all_events.append(event)
    print json.dumps(all_events)

    return JsonResponse(all_events, safe=False)