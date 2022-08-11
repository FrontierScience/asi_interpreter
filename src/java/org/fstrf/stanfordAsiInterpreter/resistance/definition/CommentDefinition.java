/**
Copyright 2017 Frontier Science & Technology Research Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

ADDITIONAL DISCLAIMER:
In addition to the standard warranty exclusions and limitations of 
liability set forth in sections 7, 8 and 9 of the Apache 2.0 license 
that governs the use and development of this software, Frontier Science 
& Technology Research Foundation disclaims any liability for use of 
this software for patient care or in clinical settings. This software 
was developed solely for use in medical and public health research, and 
was not intended, designed, or validated to guide patient care.
*/ 



package org.fstrf.stanfordAsiInterpreter.resistance.definition;

import com.google.common.base.Strings;

public class CommentDefinition implements Definition {
	
	private static final String FORMAT = "{id: %s, text: %s, sort: %s}";
	
	private String id;
	private String text;
	private Integer sort;
	
	public CommentDefinition(String id, String text) {
		this.id = id;
		this.text = text;
	}
	
	public CommentDefinition(String id, String text, Integer sort) {
		this.id = id;
		this.text = text;
		this.sort = sort;
	}
	
	public String getId(){
		return this.id;
	}
	
	public String getText(){
		return this.text;
	}
	
	public Integer getSort(){
		return this.sort;
	}
	
	public String getResistance() {
		return this.text;
	}
	
	public String toString(){
		return Strings.lenientFormat(FORMAT, id, text, sort);
	}
}
