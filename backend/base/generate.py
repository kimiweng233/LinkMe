import openai

def profileOrganizer(data):
    profile = ""
    profile += "Name: {}\n\n".format(data["name"])
    profile += "Grade Level: {}\n\n".format(data["gradeLevel"])
    profile += "Major: {}\n\n".format(data["major"])
    profile += "Skills: \n"
    for index, skill in data["skills"].items():
        profile += (skill + ",  ")
    profile += "\n\n"
    profile += "Experiences:\n\n"
    for index, experience in data["experiences"].items():
        profile += "title: {}\n".format(experience["title"])
        profile += "company: {}\n".format(experience["company"])
        profile += "{} - {}\n".format(experience["startDate"], experience["endDate"] if not experience["onGoing"] else "Present")
        profile += "description: {}\n\n".format(experience["description"])
    return profile

def generatePrompt(profile):
    prompt = ""
    jobDescription = "Confidence can sometimes hold us back from applying for a job. But we'll let you in on a secret: there's no such thing as the 'perfect' candidate. HubSpot is a place where everyone can grow. So however you identify and whatever background you bring with you, please apply if this is a role that would make you excited to come into work every day.\nHubSpot is looking for co-ops who are interested in solving complex problems and being part of one of the fastest growing, most ambitious engineering teams in the world. HubSpot engineering co-ops work with our engineers in small teams with minimal process and are given the freedom to do big things and own the software they create. Must be available to work full time for Fall 2023 to apply.\nOur technology stack is diverse, and we are looking to fill roles for a variety of projects including:\nMiddle tier APIs & web services in Java (DropWizard)\nDynamic web applications written in JavaScript (React, ECMAScript 6, Sass)\nCore data and infrastructure development with HBase, Elastic Search, ZooKeeper, Redis, MySQL, and Memcached.\nRunning, monitoring, and deploying to thousands of servers in multiple data centers & the cloud (DevOps & SRE)\n\nCandidates Should Have Web Development Experience (projects Like Mobile Apps, Web Apps, Or Games Beyond Coursework Is a Plus) And Top Candidates Will Have\n\\nAn unmatched curiosity to learn and grow their skills with new challenges\nA strong understanding of HubSpot’s business, products, and culture\nExcellent communication and collaboration skills\nConfidence taking on big initiatives and leading projects in a fast-paced environment\n\nAs an engineer you will get a MacBook Pro 16 and a GitHub Enterprise account on your first day. Working closely with your team, you will start shipping production code right away.\n\nMust be available to work full time for Fall 2023 to apply.\n\nCome help us build real products that thousands of customers depend on. To read more about our Product and Engineering team at HubSpot, check out this page : http://product.hubspot.com/jobs-internships-co-ops\n\nAbout HubSpot\n\nHubSpot (NYSE: HUBS) is a leading customer relationship management (CRM) platform that provides software and support to help businesses grow better. We build marketing, sales, service, and website management products that start free and scale to meet our customers’ needs at any stage of growth. We’re also building a company culture that empowers people to do their best work. If that sounds like something you’d like to be part of, we’d love to hear from you.\n\nYou can find out more about our company culture in the HubSpot Culture Code, which has more than 5M views, and learn about our commitment to creating a diverse and inclusive workplace, too. Thanks to the work of every employee globally, HubSpot was named the #2 Best Place to Work on Glassdoor in 2022, and has been recognized for award-winning culture by Great Place to Work, Comparably, Fortune, Entrepreneur, Inc., and more.\n\nHeadquartered in Cambridge, Massachusetts, HubSpot was founded in 2006. Today, thousands of employees work across the globe in HubSpot offices and remotely. Visit our careers website to learn more about culture and opportunities at HubSpot.\n\nBy submitting your application, you agree that HubSpot may collect your personal data for recruiting, global organization planning, and related purposes. HubSpot's Privacy Notice explains what personal information we may process, where we may process your personal information, our purposes for processing your personal information, and the rights you can exercise over HubSpot’s use of your personal information."
    prompt += "Given this job posting:\n"
    prompt += (jobDescription + "\n\n")
    prompt += "and these candidate info:\n"
    prompt += (profile + "\n\n")
    prompt += "generate a cover letter for about 300 words"
    return prompt

def feedPrompt(prompt):
    openai.api_key = "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" 
    model_engine = "text-davinci-003" 
    completion = openai.Completion.create( 
        engine=model_engine,
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )
    return completion["choices"][0]["text"]

def coverLetterGenerator(data):
    profile = profileOrganizer(data)
    prompt = generatePrompt(profile)
    coverLetter = feedPrompt(prompt)
    return coverLetter

