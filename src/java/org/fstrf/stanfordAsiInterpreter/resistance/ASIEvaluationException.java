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



package org.fstrf.stanfordAsiInterpreter.resistance;

@SuppressWarnings("all") public class ASIEvaluationException extends Exception {
	
	private static final long serialVersionUID = -5617747657984880353L;
	
	public ASIEvaluationException() {
		super();
	}
	
	public ASIEvaluationException(String message) {
		super(message);
	}
	
	public ASIEvaluationException(String message, Throwable cause)  {
		super(message, cause);
	}
	
	public ASIEvaluationException(Throwable cause) {
		super(cause);
	}
}
