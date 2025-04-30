---
title: Designing Critical Systems. Airplanes, Medical Devices, and Blockchains
date: 2025-04-20T16:43:20+05:30
slug: critical-systems
draft: false
---

It's acceptable for some systems to fail occasionally, but others simply cannot afford to. Your [Windows can crash](https://en.wikipedia.org/wiki/Blue_screen_of_death), but the software controlling an airplane's engine cannot.

Not all systems are designed the same way. The more critical the system, the stricter the requirements and the more expensive it becomes. In this post, I will take a systems and software approach to understand:

- Systems classification according to criticality.
- How to make your systems more robust.

No matter which industry you're in, you should apply some of these principles, especially those that don't significantly impact system cost.

## Systems According to Their Criticality

Designing a pacemaker, airplane engine control software, a social network web app, a blockchain, or a [Tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi) is not the same. Depending on the consequences of a system failure, we classify them. The classification ranges from risk of death, injury, loss of money, reputation, to merely frustrating your users.

- 4️⃣ **Life critical:** A failure poses an immediate risk of death.
  - Pacemaker electronics, firmware, and software.
  - Nuclear power plant control.
  - Some airplane avionics.
- 3️⃣ **Safety critical:** High risk of serious injury or loss of life, but with a human-in-the-loop to prevent it.
  - Airplane autopilot.
  - Some automotive driving aids.
- 2️⃣ **Mission critical:** A failure leads to immense reputational damage and major business disruption, but no risk of loss of life. Huge financial loss.
  - Trading systems.
  - Blockchains and smart contracts.
  - Some unmanned space missions.
- 1️⃣ **Business critical:** Similar to mission critical but with less impact on reputation or financial loss.
  - CRM systems.
  - Reservation systems for hotels or flights.
  - Most of the apps and services we use daily.
- 0️⃣ **Non critical:** Failures go unnoticed and have little to no impact.
  - Proof of concepts to showcase a feature.
  - Internal demos, prototypes, or hobby projects.

From level 2 and above, there are regulations you must comply with. The closer to level 4, the more regulated and stricter the requirements.

You might ask, "I don't like my bank's app crashing, so why don't they design it with greater criticality?" In an ideal world with infinite resources, you'd want every system and software designed to the highest standards, even your kid's Tamagotchi. Who wants their child crying if it stops working?

But that's not feasible. Designing systems and software at the top level is extremely expensive. So, one must conduct a risk analysis and use a [risk matrix](https://en.wikipedia.org/wiki/Risk_matrix) to establish the criticality they aim for.

## Safe System Design Tips

Let's explore some tips to make systems more robust against failures. Note that there are no guarantees. All regulations, certifications, and good practices can only make failure [as low as reasonably possible](https://en.wikipedia.org/wiki/As_low_as_reasonably_practicable). Close to zero, but never zero.

Each of these layers adds a [Swiss cheese](https://en.wikipedia.org/wiki/Swiss_cheese_model) layer. The more layers, the less likely you will find a hole aligned with every layer. That aligned hole is a metaphor for system failure.

The analysis is biased towards some industries I have knowledge of: safety-critical aeronautics and mission-critical blockchains. One regulated, the other not.

**Have parallel redundancy**

Never rely on a single system. It will eventually fail. Airplanes use [Triple Modular Redundancy](https://en.wikipedia.org/wiki/Triple_modular_redundancy). Each sensor has three copies, and a computer votes, accepting what the majority says. If one fails, operations can continue.

This is a must in safety-critical systems, but in 2018/2019, more than 300 people lost their lives in the [Boeing 737 MAX 8 accidents](https://spectrum.ieee.org/how-the-boeing-737-max-disaster-looks-to-a-software-developer). Among other things, MCAS was using a single angle of attack sensor. No redundancy was used.

Distributed systems and blockchains also have some sort of redundancy. They are [Byzantine Fault Tolerant](https://en.wikipedia.org/wiki/Byzantine_fault), meaning the system can keep working even if half of the nodes are faulty or malicious.

Beyond system failures, systems can be compromised. This is why you should avoid any central point of failure in your architectures. In blockchains, [multi-sig wallets](https://en.bitcoin.it/wiki/Multi-signature) require multiple parties (e.g., 2/3 or 4/6) to sign a transaction before it's considered valid. If one actor is compromised, the system stays safe.

**Have a standby backup**

A cheaper solution is to have a backup system or cold redundancy. Only when the main one fails does the backup start to take over. Since the backup is not always running, there is some failover latency. The time it takes for the backup to take over.

A [diesel generator](https://en.wikipedia.org/wiki/Diesel_generator) is commonly used to replace the electric grid after a blackout. But it takes a few minutes to start. In some critical infrastructures like hospitals, airports, or data centers, a set of batteries covers the gap while generators take over.

Airplanes get electricity from [engine bleeding](https://en.wikipedia.org/wiki/Bleed_air), but if the engines stop, there would be no electricity to power the control surfaces, which basically allows the plane to move. Luckily, there is the [APU](https://en.wikipedia.org/wiki/Auxiliary_power_unit), which takes over to produce electricity when the engines shut down. And even if the APU runs out of gas, the [RAT](https://en.wikipedia.org/wiki/Ram_air_turbine) can take over. It offers a limited supply but is the last line of defense.

**Rely on physics**

Airplanes have a hydraulic system to extend the [landing gear](https://en.wikipedia.org/wiki/Landing_gear). But if for any reason that fails, it can extend by gravity.

Having physics as the last resort is also common in nuclear reactors, train brakes, and elevators. Their default state governed by physics is the safe one. So when nothing works, they stay safe.

**Avoid common mode failures**

Redundancy is useless if all systems are exposed to the same common mode failures. Multiple servers running is redundant, but if all of them are running at the same location, a flood, bomb, or a long power outage will make the redundancy useless.

Blockchains like Ethereum are designed and operated in a way that a common mode failure won't halt the system. Different entities run five different software implementations developed by independent teams in different programming languages. Each node belongs to different companies, is in different countries, and has different interests.

The same applies to avionics. Systems are [dissimilar](https://aviation.stackexchange.com/questions/44349/how-dissimilar-are-redundant-flight-control-computers). Critical systems use different hardware architectures (Intel, Motorola) and have different teams doing the implementation.

The same with airplane cables and pipes. Electric and hydraulic systems are redundant, but the cables are not too close to each other. Otherwise, the same failure could affect both, rendering the redundancy useless.

**Perform regular failover drills**

You should periodically test that when your system fails, your failover mechanism works correctly. Failure events are rare, so this transition barely happens. Since it's not business as usual, unexpected things can happen in the transition.

Do a lot of [chaos testing](https://en.wikipedia.org/wiki/Chaos_engineering) to ensure that when the problem comes, your system will be ready to withstand it.

**Adopt standards**

Following standards and being audited is not a guarantee that the system is perfect. But it helps, and well, in some industries, it is mandatory. There are tons of standards: [DO‑178C](https://en.wikipedia.org/wiki/DO-178C) for avionics, [ISO 26262](https://en.wikipedia.org/wiki/ISO_26262) for automotive, and [IEC 62304](https://en.wikipedia.org/wiki/IEC_62304) for medical devices. I'm writing this post from a software and systems perspective, but you have other standards for hardware and almost any system on the stack.

If your industry is not heavily regulated, I'm sure you can learn something from these and apply them to some extent, even if your goal is not to comply.

Industries like blockchain have zero regulation, but this doesn't mean you can't learn from past mistakes. Explore past mistakes made by others and ensure your system is protected against them. Also, get audits from external well-reputed firms.

**Rigorous change control**

Maintain rigorous change logs, release notes, and at least a two-person sign-off for any update. Use version control systems like Git. Ideally, the people signing off should have something at stake. A reputation at least, and ideally legal implications.

And well, ensure you are using the correct version. Accidents where the deployed version differs from the intended version have happened. This happened to [KCG](https://en.wikipedia.org/wiki/Knight_Capital_Group). A fat finger error with an old version caused a partial collapse of the stock market. Establish processes so that this can't happen.

**Have proper observability and logs**

Every system should log periodically what's happening. Log every command, action, warning, sensor reading, and error, with timestamps and as much detail as possible. This will allow you to reconstruct what happened if things go wrong.

You should also have dashboards and different plots that help you understand what's happening. A system usually doesn't stop working abruptly. In some cases, it degrades first. If you can detect that, you can buy some time.

**Understand your dependencies**

Your system is as strong as the weakest system it depends on. No matter how well-designed your system is, if it depends on another system that fails, yours will fail too.

If your software is certified to be used in airplanes but the hardware you use is an [Arduino](https://en.wikipedia.org/wiki/Arduino), it won't matter how good the software is.

From a code perspective, the whole stack can be:

- **The programming language and compiler**: Some critical systems require using a certified compiler. If your application is not critical, using Java, C, or C++ and GCC is fine, but beware of using a random language you find on the internet.
- **Your dependencies**: Code usually contains dependencies that are not written by you. Ensure they are legit and have been used by many people for some time. In heavily regulated industries, you can't just import any GitHub module, but in some business-critical industries with no regulation, you can. Beware.
- **The operating system**: The operating system is the one scheduling your software and giving it permissions, e.g., to use the CPU. Consumer OS like Windows, macOS, or Linux don't offer any guarantee. That's why apps sometimes hang. Critical applications use real-time operating systems or RTOS. Understand the difference.
- **The hardware**: All software runs on top of hardware. This could be your computer or a microcontroller. There are different architectures and different guarantees. Not all hardware survives in the desert or space.
- **The power supply**: All above doesn't matter if you lose power. So understand how critical your system is and if you may need a backup.

**Understand human factors**

Most systems are operated or interconnected with humans in some way. And humans mess up. If the system is too complex to operate, the human will mess up. Or even if it's simple, the human may have a bad day, be tired, or distracted, and end up messing up.

First and foremost, design systems that are simple. The system should abstract all the complexity away from the user. Design user graphical interfaces that are simple and intuitive.

Secondly, use [checklists](https://en.wikipedia.org/wiki/Preflight_checklist). If a set of steps must be performed, write it as a checklist and use it. They help ensure you are not missing anything. They are commonly used in aviation. Every item is literally written with blood. Someone in the past forgot an item, died, and now it's in there for you to not make the same mistake.

Physical safety warnings like the classic [remove before flight](https://en.wikipedia.org/wiki/Remove_before_flight) are also useful. They are tags attached to some physical components. Some checklists require them to be presented. With this, you ensure the checklist is complete. They act as proof.

If you have multiple humans operating the system, have them cross-check each other. In aviation, cabin crew do it. The classic [arm doors and crosscheck](https://www.qantasnewsroom.com.au/roo-tales/cabin-crew-lingo-101/). And pilots as well. You usually have the [pilot flying and pilot monitoring](https://en.wikipedia.org/wiki/Pilot_flying). If one messes up, the second can spot the mistake.

Also limit what the humans can do. The [Therac-25](https://en.wikipedia.org/wiki/Therac-25) radiation therapy device was involved in 6 documented accidents. In one:

> the operator incorrectly selected X-ray mode before quickly changing to electron mode, which allowed the electron beam to be set for X-ray mode without the X-ray target being in place

> Previous models had hardware interlocks to prevent such faults, but the Therac-25 had removed them, depending instead on software checks for safety. 

> The high-current electron beam struck the patients with approximately 100 times the intended dose of radiation, and over a narrower area, delivering a potentially lethal dose of beta radiation.

Assume the human will mess up. You can't be one click away from killing someone.

Another good design choice are [two hands controls](https://www.osha.gov/etools/machine-guarding/presses/two-hand-controls). If you need to press a button, you need to use both hands. This reduces the chance of pressing the button by accident. This applies also to dangerous systems like a steel press. If the human has both hands on the buttons, your are sure the are not underneath the press.

**Independent Verification & Validation**

Have a separate team (or external auditor) test the system against the requirements, trying to break it in any possible way with out-of-sequence inputs, malformed commands, rapid key-presses, power flickers, and everything you can imagine.

Mix black-box tests (operator's POV) and white-box tests (code paths, edge cases) including fault injection (e.g., simulate sensor glitches, bus errors). Ensure even in these cases things work as expected.

**Contingency Planning**

No matter how well-designed your system is, you should have an action plan for any emergency. Have predefined emergency playbooks with what to do. Pilots have them for almost any emergency you can imagine.

Ideally, your system should have a [kill switch](https://en.wikipedia.org/wiki/Kill_switch) to abort the operation as soon as possible. In trains, this could be an emergency brake. In blockchains, it could be a function in the smart contract to halt all activity. It's better to have it and not use it than needing it and not having it.

**Understand your threat model**

Up until now, we have just considered accidental system failures. But there is a whole new dimension when we take into account deliberate attacks on our systems. These could be by both external or internal actors. Let's go through the most important ones.

Your system should be protected against a [DoS](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://en.wikipedia.org/wiki/Denial-of-service_attack) attack. If your system is not exposed to the internet, the attack surface is smaller but not zero. Some systems can still be accessed physically or within their connection coverage. The [DME](https://crypto.stanford.edu/FAA/) used for navigation is exposed to all sorts of attacks and is not connected to the internet.

Ensure you know the latest [CVE](https://en.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures) and perform regular internal and external audits. But with this, you just cover the known issues. It doesn't hurt to have a [bug bounty](https://en.wikipedia.org/wiki/Bug_bounty_program). With this, if someone finds an issue, you incentivize them to report it for some bounty. A nice way to reward them for finding it.

And let's not forget about internal threats. An internal employee may introduce a vulnerability on purpose to exploit for their own benefit. Or just to cause harm before leaving the company. No matter how resilient your airplane systems are, if the [pilot wants to crash the airplane](https://en.wikipedia.org/wiki/Germanwings_Flight_9525), you are done.

## Conclusion

* Designing systems to the highest criticality level is expensive and not always feasible nor needed.
* But it doesn't harm to apply some of these principles and best practices. Even if you are not forced to by regulations.
* Understand your systems risks and do a proper risk analysis on what can go wrong.
