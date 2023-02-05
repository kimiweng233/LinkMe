import os
from dotenv import load_dotenv
import openai
from . import jobScraping

load_dotenv()
OPENAI_KEY = os.getenv('OPENAI_KEY')

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

def generatePrompt(profile, url):
    prompt = ""
    jobDescription = jobScraping.getJobDescription(url)
    prompt += "Given this job posting:\n"
    prompt += (jobDescription + "\n\n")
    prompt += "and these candidate info:\n"
    prompt += (profile + "\n\n")
    prompt += "generate a cover letter for about 300 words that explains specifically why the candidate is a good fit for the job. Mention to position in the letter"
    return prompt

def feedPrompt(prompt):
    openai.api_key = OPENAI_KEY
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
    prompt = generatePrompt(profile, data["url"])
    coverLetter = feedPrompt(prompt)
    return coverLetter