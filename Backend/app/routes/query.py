import spacy
import re

from .reddit_es import *
from .newconv_es import *
from .wiki import *

from ..helper import *
from fastapi import APIRouter
from urllib.parse import quote
import warnings
import sys
import en_core_web_sm
nlp = en_core_web_sm.load()

from ..predictor import *

sys.path.append("..")
warnings.filterwarnings("ignore")

router = APIRouter()

@router.get("/")
async def get_data(query, topic_flag, topic="", past_queries=""):

    if past_queries != "":
        query = resolve_ref(past_queries, query)
        
    print(query)
    query = str(correct_sentence_spelling(query)) # Spell correction
    query = re.sub(r'\?', '', query)
        
    query_doc = nlp(u'%s' % query)

    # Fetch Docs from all indexes
    chitchat_doc, chitchat_score = checkSimilarityScore(newconv_es_query(query), query_doc)
    reddit_doc, reddit_score = checkSimilarityScore(reddit_es_query(query, topic_flag, topic.lower(), past_queries), query_doc)
    wiki_doc, wiki_score = checkSimilarityScore(get_relevant_docs(query), query_doc)
    answer, final_score = checkSimilarityScore([chitchat_doc, reddit_doc, wiki_doc], query_doc)
    if final_score < 0.4:
        answer = "Sorry! I don't have an answer 🙇🏻"

    formated_response = format_text(answer)
    reponse = {
        "answer": formated_response,
        "keywords": keywords(query_doc),
        "coref": query,
        "scores": {
            "chitchat":chitchat_score,
            "reddit":reddit_score,
            "wiki":wiki_score
        }
    }
    return ResponseModel("string", reponse)
