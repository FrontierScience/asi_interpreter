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

public final class AResidueCondition extends PCondition<AResidueCondition>
{
    private PResidue<?> _residue_;

    public AResidueCondition()
    {
    }

    public AResidueCondition(
        PResidue<?> _residue_)
    {
        setResidue(_residue_);

    }

	@Override
    public AResidueCondition clone()
    {
        return new AResidueCondition(
            (PResidue<?>) cloneNode(_residue_));
    }

	@Override
    public void apply(Switch sw)
    {
        ((Analysis) sw).caseAResidueCondition(this);
    }

    public PResidue<?> getResidue()
    {
        return _residue_;
    }

    public void setResidue(PResidue<?> node)
    {
        if(_residue_ != null)
        {
            _residue_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _residue_ = node;
    }


	@Override
    public String toString()
    {
        return ""
            + toString(_residue_);
    }

	@Override
    void removeChild(Node<?> child)
    {
        if(_residue_ == child)
        {
            _residue_ = null;
            return;
        }

    }

	@Override
    <U extends Node<U>> void replaceChild(U oldChild, U newChild)
    {
        if(_residue_ == oldChild)
        {
            setResidue((PResidue<?>) newChild);
            return;
        }

    }
}
