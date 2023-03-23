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
    prompt += "I want you to act like you are a candidate for a job opening. I will provide you with the job's descriptions and your background information. You will find which skills and background experiences from your background information that will help with the job and write a three paragraph cover letter only talking about how these skills make you a good fit. Do not mention anything extra from the job description.\n\nJob Description:\n\n"
    prompt += (jobDescription + "\n\n")
    prompt += "Your background:\n\n"
    prompt += (profile + "\n\n")
    return prompt

def rephrasePrompt(original):
    prompt = "Rephrase this cover letter:\n\n"
    promt += original
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
    rephraseRequest = rephrasePrompt(coverLetter)
    rephrasedCoverLetter = feedPrompt(rephraseRequest)
    return rephrasedCoverLetter