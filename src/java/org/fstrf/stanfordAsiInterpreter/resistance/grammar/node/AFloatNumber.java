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

import org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.Analysis;

public final class AFloatNumber extends PNumber<AFloatNumber>
{
    private TFloat _float_;

    public AFloatNumber()
    {
    }

    public AFloatNumber(
        TFloat _float_)
    {
        setFloat(_float_);

    }
    
    @Override
    public AFloatNumber clone()
    {
        return new AFloatNumber(
            (TFloat) cloneNode(_float_));
    }

    @Override
    public void apply(Switch sw)
    {
        ((Analysis) sw).caseAFloatNumber(this);
    }

    public TFloat getFloat()
    {
        return _float_;
    }

    public void setFloat(TFloat node)
    {
        if(_float_ != null)
        {
            _float_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _float_ = node;
    }

    @Override
    public String toString()
    {
        return ""
            + toString(_float_);
    }

    @Override
    void removeChild(Node<?> child)
    {
        if(_float_ == child)
        {
            _float_ = null;
            return;
        }

    }

    @Override
    <U extends Node<U>>void replaceChild(U oldChild, U newChild)
    {
        if(_float_ == oldChild)
        {
            setFloat((TFloat) newChild);
            return;
        }

    }
}
