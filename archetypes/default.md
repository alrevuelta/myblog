---
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = '{{ .Date }}'
slug = '{{ .File.ContentBaseName | urlize }}'
draft = true
---
