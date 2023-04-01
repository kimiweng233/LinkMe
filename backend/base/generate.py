import os
from dotenv import load_dotenv
import openai
from . import jobScraping

load_dotenv()
OPENAI_KEY = os.getenv('OPENAI_KEY')
GPT_MODEL = "gpt-3.5-turbo" 

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
    conversation = [{"role": "system", "content": prompt}]
    return conversation

def rephrasePrompt(original):
    prompt = "Rephrase this cover letter:\n\n"
    prompt += original
    conversation = [{"role": "system", "content": prompt}]
    return conversation

def feedPrompt(prompt):
    openai.api_key = OPENAI_KEY
    model_engine = GPT_MODEL
    completion = openai.ChatCompletion.create( 
        engine=model_engine,
        messages=prompt,
    )
    return completion.choices[-1].message.content

def coverLetterGenerator(data):
    profile = profileOrganizer(data)
    prompt = generatePrompt(profile, data["url"])
    coverLetter = feedPrompt(prompt)
    rephraseRequest = rephrasePrompt(coverLetter)
    rephrasedCoverLetter = feedPrompt(rephraseRequest)
    return rephrasedCoverLetter