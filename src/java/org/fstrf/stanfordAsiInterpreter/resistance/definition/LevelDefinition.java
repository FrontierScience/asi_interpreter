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

import java.text.MessageFormat;

@SuppressWarnings("all") public class LevelDefinition implements Definition {

	private static final MessageFormat FORMAT = 
		new MessageFormat("'{'order: {0,number,integer}, text: {1}, sir: {2}'}'");
	
	private Integer order;
	private String text;
	private String sir;
	
	public LevelDefinition(Integer order, String text, String sir) {
		this.order = order;
		this.text = text;
		this.sir = sir;
	}
	
	public Integer getOrder(){
		return this.order;
	}
	
	public String getText(){
		return this.text;
	}
	
	public String getSir(){
		return this.sir;
	}
	
	public String getResistance() {
		return this.text;
	}
	
	public String toString(){
		Object[] objs = { this.order, this.text, this.sir };
		return FORMAT.format(objs);
	}
}
