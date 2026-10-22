#!/usr/bin/env python3
"""Convert uploaded Snowflake lab JSON documents into a typed TS data module."""
import json, re, html

FILES = [
    ("upload/Data Warehousing.json", "Data Warehousing"),
    ("upload/Data Engineering.json", "Data Engineering"),
]

def clean_html(s):
    if not s:
        return None
    s = re.sub(r'\sstyle="[^"]*"', '', s)          # strip inline styles (black text etc.)
    s = s.replace('&nbsp;', ' ')
    s = re.sub(r'<p>\s*</p>', '', s)                # empty paragraphs
    return s.strip() or None

def parse_jsonish(v):
    if isinstance(v, str) and v.strip():
        try:
            return json.loads(v)
        except Exception:
            return None
    return v if v else None

out = []
for fname, _ in FILES:
    with open(fname) as f:
        data = json.load(f)
    group = data.get("courseGroups", [{}])[0]
    for course in data.get("courses", []):
        labs_out = []
        for lab in course.get("labs", []):
            modules_out = []
            for m in sorted(lab.get("modules", []), key=lambda x: x.get("order", 0)):
                if m.get("hidden"):
                    continue
                steps_out = []
                for s in sorted(m.get("steps") or [], key=lambda x: x.get("order", 0)):
                    blocks = parse_jsonish(s.get("blocks")) or []
                    blocks_clean = []
                    for b in blocks:
                        if not isinstance(b, dict):
                            continue
                        bt = b.get("type")
                        entry = {"type": bt, "id": b.get("id")}
                        if bt == "snippet":
                            entry["lang"] = b.get("lang") or b.get("codeLang") or "sql"
                            entry["code"] = b.get("code") or b.get("snippet") or ""
                            entry["label"] = b.get("label") or b.get("caption")
                        elif bt == "image":
                            entry["url"] = b.get("url") or b.get("image")
                            entry["caption"] = b.get("caption")
                        elif bt == "description":
                            entry["html"] = clean_html(b.get("html"))
                        blocks_clean.append(entry)
                    code = s.get("code")
                    steps_out.append({
                        "title": s.get("title"),
                        "description": clean_html(s.get("description")),
                        "code": code if code else None,
                        "codeLang": s.get("codeLang"),
                        "image": s.get("image"),
                        "imageCaption": s.get("imageCaption"),
                        "blocks": blocks_clean,
                    })
                flow = parse_jsonish(m.get("flow"))
                modules_out.append({
                    "title": m.get("title"),
                    "overview": clean_html(m.get("overview")),
                    "explanation": clean_html(m.get("explanation")),
                    "output": clean_html(m.get("output")),
                    "outputCode": m.get("outputCode") or None,
                    "flow": flow if flow else None,
                    "steps": steps_out,
                })
            labs_out.append({
                "title": lab.get("title"),
                "order": lab.get("order", 0),
                "linkUrl": lab.get("linkUrl"),
                "modules": modules_out,
            })
        labs_out.sort(key=lambda x: x.get("order", 0) or 0)
        out.append({
            "title": course.get("title"),
            "groupName": course.get("groupName") or group.get("name"),
            "color": course.get("color") or group.get("color") or "#29B5E8",
            "labs": labs_out,
        })

banner = """// AUTO-GENERATED from AtomLearn lab docs exports (Data Warehousing.json / Data Engineering.json)
// Do not edit by hand — run scripts/convert-labs.py to regenerate.

export interface LabStepBlock {
  type: string;
  id?: string | null;
  lang?: string;
  code?: string;
  label?: string | null;
  url?: string | null;
  caption?: string | null;
  html?: string | null;
}

export interface LabStep {
  title: string | null;
  description: string | null;
  code: string | null;
  codeLang: string | null;
  image: string | null;
  imageCaption: string | null;
  blocks: LabStepBlock[];
}

export interface FlowNodeDef {
  id: string;
  label: string;
  type: string; // start | process | decision | end
}

export interface LabModule {
  title: string | null;
  overview: string | null;
  explanation: string | null;
  output: string | null;
  outputCode: string | null;
  flow: FlowNodeDef[] | null;
  steps: LabStep[];
}

export interface Lab {
  title: string | null;
  order: number;
  linkUrl: string | null;
  modules: LabModule[];
}

export interface LabCourse {
  title: string | null;
  groupName: string;
  color: string;
  labs: Lab[];
}

export const LAB_COURSES: LabCourse[] = """

body = json.dumps(out, indent=1, ensure_ascii=False)
n_courses = len(out)
n_labs = sum(len(c["labs"]) for c in out)
n_modules = sum(len(l["modules"]) for c in out for l in c["labs"])
n_steps = sum(len(m["steps"]) for c in out for l in c["labs"] for m in l["modules"])
ts = banner + body
ts += ";\n\nexport const LAB_STATS = {\n"
ts += f"  courses: {n_courses},\n  labs: {n_labs},\n  modules: {n_modules},\n  steps: {n_steps},\n"
ts += "} as const;\n"

with open("src/lib/labs-data.ts", "w") as f:
    f.write(ts)

print("courses:", len(out))
for c in out:
    print(" ", c["title"], "->", len(c["labs"]), "labs")
print("written src/lib/labs-data.ts", len(ts), "bytes")
