-----------------------------------------------------------------------
**WARNING:** In addition to the standard warranty exclusions and
limitations of liability set forth in sections 7, 8 and 9 of the Apache
2.0 license that governs the use and development of this software,
Frontier Science & Technology Research Foundation disclaims any
liability for use of this software for patient care or in clinical
settings. This software was developed solely for use in medical and
public health research, and was not intended, designed, or validated to
guide patient care.

-----------------------------------------------------------------------

Purpose
=======

The ASI (Algorithm Specification Interface) Interpreter allows viral
drug resistance calculations to be made using a variety of different
algorithms. It takes an algorithm and a mutation list as input, and
returns resistance interpretations calculated according to that
specific algorithm, and associated results, as output. 


Requirements
============

The ASI Interpreter is a platform-independent Java library, not a
standalone application. 

The ASI Interpreter requires the following additional libraries:

+ [commons-cli-1.1.jar](https://commons.apache.org/proper/commons-cli/)
+ [commons-collections-2.1.1.jar](https://commons.apache.org/proper/commons-collections/)
+ [dom4j-2.0.2.jar](https://github.com/dom4j/dom4j)
+ [jaxen-1.1.jar](https://github.com/jaxen-xpath/jaxen)
+ [junit-3.8.1.jar](http://junit.sourceforge.net/junit3.8.1/)

The ASI Interpreter requires JRE 1.7 or higher.

Background
==========

Approach
--------

ASI is a common platform developed by Frontier Science & Technology 
Research Foundation and Robert Shafer's team at Stanford (creators 
of the widely used [HIV Drug Resistance Database]
(https://hivdb.stanford.edu/)) for coding genotypic interpretation 
algorithms. The platform uses an XML format for specifying an 
algorithm. The ASI Interpreter compiles the algorithm and executes 
it on user-specified data. ASI makes it possible for drug resistance 
experts to develop and test genotypic interpretation algorithms 
without the assistance of a computer programmer, allowing them to 
focus on developing, testing, and modifying rules rather than on 
developing software to implement algorithms.

By using this approach, the rules for calculating resistance can be
changed at any time without altering program code. Furthermore, the
rules used are easily readable by other scientists, enhancing
transparency and reproducibility. The grammar allowed by the DTD is
flexible enough to express an enormous variety of possible rules for
calculating resistance (or other results that can be calculated on the
basis of viral mutations).

Workflow
--------

The ASI Library takes as input an algorithm file and a list of 
mutations for sequence/gene combinations. The ASI Interpreter checks 
the specified algorithm for compliance to the ASI2 grammar, then 
compiles it and executes it against the data, creating a mapping of
drugs/drug classes to resistance scores.

The algorithm XML file is parsed into a set of Java objects. At the 
root level, there will be a mapping of drug class names to lists of 
drugs. All drugs will contain an evaluate method -- when provided a 
list of mutations and a mutation comparator, this method will return
a set of evaluated conditions. An evaluated condition is a wrapper 
object for storing the original condition statement, the evaluated
results, and a set of resistance definitions. For each condition 
defined in the algorithm file for a particular drug, the condition 
is pre-compiled into an ASI syntax tree (see below) for analysis. 

Syntax Trees
------------

The ASI Interpreter uses [SableCC](http://www.sablecc.org/) as a
grammar compiler to process conditional statements. Using a grammar
definition file we created, the SableCC program created a skeleton of
strictly-typed abstract syntax trees (AST) and tree walkers. With just
this code we were able to process any ASI condition statement into an
AST, and using one of their tree walkers move through each node in
order. While this provided an extremely useful way for traversing the
statement, by itself it did nothing. 

Our next step was to create a class of our own that built off of 
SableCC’s depth-first traversal tree walker. However in our version, 
instead of simply passing through each node (or production, any clause 
defined within the grammar) of the syntax tree, we added functions for 
evaluating these productions. 

The results of these evaluations are pushed into a stack that is used 
by the parent node, when there are no nodes left; the resulting value 
on the stack is used as an answer. For example if we were to evaluate 
the residue production, we’d compare the residue with all of the 
mutations in our list. If there was a match we’d add true onto the 
stack; if not, we’d add false. The next production up (for example this 
could be an *or* statement) need not care about the two statements below 
it, just whether or not those statements evaluated to true or false. 

The process of evaluation would continue until the entire tree had been 
exhausted. At this point we’d have one final value on the stack, a 
number (we had to find some value that could represent the results of 
both score statements and boolean statements). If the action associated 
with the condition is a score statement, the final value will be used 
directly for determining the level. However if the action is a comment 
or level, a value of 0 represents false and all other values represent 
true.
