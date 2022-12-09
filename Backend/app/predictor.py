import spacy
import neuralcoref

import en_core_web_sm
nlp = en_core_web_sm.load()
neuralcoref.add_to_pipe(nlp)

def resolve_ref(past_quries, query):
    new = past_quries+ ". "+ query
    doc = nlp(u'%s' % new)  
    res = doc._.coref_resolved
    out = res.split(". ")[-1]
    return out
