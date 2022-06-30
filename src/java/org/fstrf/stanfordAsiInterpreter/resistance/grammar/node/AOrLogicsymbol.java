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



/* This file was generated by SableCC (http://www.sablecc.org/). */

package org.fstrf.stanfordAsiInterpreter.resistance.grammar.node;

import java.util.*;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.*;

@SuppressWarnings("all") public final class AOrLogicsymbol extends PLogicsymbol
{
    private TOr _or_;

    public AOrLogicsymbol()
    {
    }

    public AOrLogicsymbol(
        TOr _or_)
    {
        setOr(_or_);

    }
    public Object clone()
    {
        return new AOrLogicsymbol(
            (TOr) cloneNode(_or_));
    }

    public void apply(Switch sw)
    {
        ((Analysis) sw).caseAOrLogicsymbol(this);
    }

    public TOr getOr()
    {
        return _or_;
    }

    public void setOr(TOr node)
    {
        if(_or_ != null)
        {
            _or_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _or_ = node;
    }

    public String toString()
    {
        return ""
            + toString(_or_);
    }

    void removeChild(Node child)
    {
        if(_or_ == child)
        {
            _or_ = null;
            return;
        }

    }

    void replaceChild(Node oldChild, Node newChild)
    {
        if(_or_ == oldChild)
        {
            setOr((TOr) newChild);
            return;
        }

    }
}
