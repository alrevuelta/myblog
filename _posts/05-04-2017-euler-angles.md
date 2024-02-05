---
title: Euler angles and gimbal lock
date: 05-04-2017
permalink: /posts/euler-angles
---

Euler Angles were first introduced by Leonhard Euler. According to his theorem, any rotation can be described using three angles ($\phi, \theta, \psi$) also referred as roll, pitch and yaw. They can be seen as head movements: saying "no" is the yaw, saying "yes" is the pitch, and leaning the head left or right is the roll.

![imagen](https://github.com/alrevuelta/myblog/assets/8811422/f8b07b4b-2d5c-416b-842b-7d690a2d8d54)


Note that the order that which the angles are represented is not important, but the order of rotation is. For this post, we will be using the $ZYX$. The following equation is a very important expression, which represents the rotation along the three axes in the $ZYX$ order. Note that for shortening purposes, $\cos(x)$ is $c(x)$ and $\sin(x)$ is $s(x)$.

$$
\begin{equation}
R(\phi, \theta, \psi)=\begin{pmatrix}
	c(\phi) & -s(\phi) & 0\\
	s(\phi) & c(\phi) & 0\\ 
	0 & 0 & 1\\ 
 \end{pmatrix}
 \begin{pmatrix}
	c(\theta) & 0 & s(\theta)\\
	0 & 1 & 0\\ 
	-s(\theta) & 0 & c(\theta)\\ 
 \end{pmatrix}
 \begin{pmatrix}
	1 & 0 & 0\\
	0 & c(\psi) & -s(\psi)\\ 
	0 & s(\psi) & c(\psi)\\ 
 \end{pmatrix}
\end{equation}
$$

After doing the maths, in the following equation we can observe the rotation matrix for angles $\phi, \theta, \psi$ which is represented using the order $Z,Y,Z$, which can also be denoted as $R_{ZYX}(\phi, \theta, \psi)$.

$$
\begin{equation}\
R=
 \begin{pmatrix}
	c(\phi)c(\theta) & c(\phi)s(\theta)s(\psi) - s(\phi)c(\psi) & c(\phi)s(\theta)c(\psi) + s(\phi)s(\psi)\\
	s(\phi)c(\theta) & s(\phi)s(\theta)s(\psi) + c(\phi)c(\psi) & s(\phi)s(\theta)c(\psi) - c(\phi)s(\psi)\\ 
	-s(\theta) & c(\theta)s(\psi) & c(\theta)c(\psi)\\ 
 \end{pmatrix}
\end{equation}
$$

Note that in some literature, these angles can also be referred as $\alpha, \beta, \gamma$, equivalent to $\phi, \theta, \psi$. An example of the rotation order is represented in the following figure:

![imagen](https://github.com/alrevuelta/myblog/assets/8811422/fcd7cc7c-75a4-42b6-aa64-33fef91e8ecd)


Euler angles seem to be intuitive and easy to work with. However, they have a limitation called *gimbal lock*. This singularity is the loss of one degree of freedom in a three-gimbal system. It occurs when two out of the three gimbals are aligned, and a degree of freedom is lost. An example is shown in here:

![imagen](https://github.com/alrevuelta/myblog/assets/8811422/9372b3ca-db04-4ac7-adec-842423d3f284)


Depending on the application, the Euler rotation convention $XYZ, ZYX, ...$ can be changed to avoid the *gimbal lock* in the typical scenarios. Using $ZYX$, the *gimbal lock* will happen when $\theta = \pi/2$. Luckily, some of the algorithms that are commonly used (DCM and Madgwick) don't work with Euler Angles, so this won't be a problem at all. Substituting the value of $\theta$ the result is:

$$
\begin{equation}
R=
 \begin{pmatrix}
	0 & c(\phi)s(\psi) - s(\phi)c(\psi) & c(\phi)c(\psi) + s(\phi)s(\psi)\\
	0 & s(\phi)s(\psi) + c(\phi)c(\psi) & s(\phi)c(\psi) - c(\phi)s(\psi)\\ 
	-1 & 0 & 0\\ 
 \end{pmatrix}
\end{equation}
$$

Using some basic trigonometric relations it becomes the following equation. In this expression, it can be seen that changing the values $\phi, \psi$, has the same effect. One degree of freedom has been lost. In this case, a pitch of 90 degrees will lead to a *gimbal lock*.

$$
\begin{equation}
R=
 \begin{pmatrix}
	0 & -\sin(\phi - \psi) & \cos(\phi - \psi)\\
	0 & \cos(\phi - \psi) & \sin(\phi - \psi) \\
	-1 & 0 & 0\\ 
 \end{pmatrix}
\end{equation}
$$
