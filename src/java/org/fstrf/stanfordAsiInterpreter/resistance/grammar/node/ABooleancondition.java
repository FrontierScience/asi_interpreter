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

public final class ABooleancondition extends PBooleancondition
{
    private PCondition _condition_;
    private final LinkedList _condition2_ = new TypedLinkedList(new Condition2_Cast());

    public ABooleancondition()
    {
    }

    public ABooleancondition(
        PCondition _condition_,
        List _condition2_)
    {
        setCondition(_condition_);

        {
            this._condition2_.clear();
            this._condition2_.addAll(_condition2_);
        }

    }
    public Object clone()
    {
        return new ABooleancondition(
            (PCondition) cloneNode(_condition_),
            cloneList(_condition2_));
    }

    public void apply(Switch sw)
    {
        ((Analysis) sw).caseABooleancondition(this);
    }

    public PCondition getCondition()
    {
        return _condition_;
    }

    public void setCondition(PCondition node)
    {
        if(_condition_ != null)
        {
            _condition_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _condition_ = node;
    }

    public LinkedList getCondition2()
    {
        return _condition2_;
    }

    public void setCondition2(List list)
    {
        _condition2_.clear();
        _condition2_.addAll(list);
    }

    public String toString()
    {
        return ""
            + toString(_condition_)
            + toString(_condition2_);
    }

    void removeChild(Node child)
    {
        if(_condition_ == child)
        {
            _condition_ = null;
            return;
        }

        if(_condition2_.remove(child))
        {
            return;
        }

    }

    void replaceChild(Node oldChild, Node newChild)
    {
        if(_condition_ == oldChild)
        {
            setCondition((PCondition) newChild);
            return;
        }

        for(ListIterator i = _condition2_.listIterator(); i.hasNext();)
        {
            if(i.next() == oldChild)
            {
                if(newChild != null)
                {
                    i.set(newChild);
                    oldChild.parent(null);
                    return;
                }

                i.remove();
                oldChild.parent(null);
                return;
            }
        }

    }

    private class Condition2_Cast implements Cast
    {
        public Object cast(Object o)
        {
            PCondition2 node = (PCondition2) o;

            if((node.parent() != null) &&
                (node.parent() != ABooleancondition.this))
            {
                node.parent().removeChild(node);
            }

            if((node.parent() == null) ||
                (node.parent() != ABooleancondition.this))
            {
                node.parent(ABooleancondition.this);
            }

            return node;
        }
    }
}